import React, { createContext, useContext, useState, useMemo } from "react";
import type { Property } from "@/types";
import { PROPERTIES } from "@/data/properties";

interface PropertyFilters {
  listingType: "all" | "buy" | "rent";
  type: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  minArea: number;
  search: string;
}

interface PropertyContextType {
  properties: Property[];
  allProperties: Property[];
  filters: PropertyFilters;
  setFilters: (f: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  addProperty: (p: Omit<Property, "id" | "postedDate" | "views">) => Property;
  updateProperty: (id: string, data: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
}

const defaultFilters: PropertyFilters = {
  listingType: "all",
  type: "all",
  city: "all",
  minPrice: 0,
  maxPrice: 999999999,
  bedrooms: 0,
  minArea: 0,
  search: ""
};

const PropertyContext = createContext<PropertyContextType | null>(null);

const getStoredProperties = (): Property[] => {
  try {
    const stored = localStorage.getItem("estatery_properties");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customProperties, setCustomProperties] = useState<Property[]>(getStoredProperties);
  const [filters, setFiltersState] = useState<PropertyFilters>(defaultFilters);

  const allProperties = useMemo(() => [...PROPERTIES, ...customProperties], [customProperties]);

  const properties = useMemo(() => {
    return allProperties.filter(p => {
      if (filters.listingType !== "all" && p.listingType !== filters.listingType) return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.city !== "all" && p.location.city !== filters.city) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.bedrooms > 0 && p.specs.bedrooms < filters.bedrooms) return false;
      if (filters.minArea > 0 && p.specs.area < filters.minArea) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.location.city.toLowerCase().includes(q) && !p.location.area.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [allProperties, filters]);

  const setFilters = (f: Partial<PropertyFilters>) => {
    setFiltersState(prev => ({ ...prev, ...f }));
  };

  const resetFilters = () => setFiltersState(defaultFilters);

  const addProperty = (data: Omit<Property, "id" | "postedDate" | "views">): Property => {
    const newProp: Property = {
      ...data,
      id: `prop-custom-${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0],
      views: 0
    };
    const updated = [...customProperties, newProp];
    setCustomProperties(updated);
    localStorage.setItem("estatery_properties", JSON.stringify(updated));
    return newProp;
  };

  const updateProperty = (id: string, data: Partial<Property>) => {
    const updated = customProperties.map(p => p.id === id ? { ...p, ...data } : p);
    setCustomProperties(updated);
    localStorage.setItem("estatery_properties", JSON.stringify(updated));
  };

  const deleteProperty = (id: string) => {
    const updated = customProperties.filter(p => p.id !== id);
    setCustomProperties(updated);
    localStorage.setItem("estatery_properties", JSON.stringify(updated));
  };

  const getPropertyById = (id: string) => allProperties.find(p => p.id === id);

  return (
    <PropertyContext.Provider value={{ properties, allProperties, filters, setFilters, resetFilters, addProperty, updateProperty, deleteProperty, getPropertyById }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperty must be used within PropertyProvider");
  return ctx;
};
