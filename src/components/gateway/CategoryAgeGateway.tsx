import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories, useAgeRanges } from "@/hooks/useApi";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CategoryAgeGateway() {
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const { data: ageRanges } = useAgeRanges();
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryDropdown(false);
    // Navigate with query param
    const params = new URLSearchParams();
    params.set("categoryId", categoryId);
    if (selectedAge) params.set("ageRangeIds", selectedAge);
    navigate(`/products?${params.toString()}`);
  };

  const handleAgeSelect = (ageId: string) => {
    setSelectedAge(ageId);
    setShowAgeDropdown(false);
    // Navigate with query param
    const params = new URLSearchParams();
    if (selectedCategory) params.set("categoryId", selectedCategory);
    params.set("ageRangeIds", ageId);
    navigate(`/products?${params.toString()}`);
  };

  const categoryName = categories?.find((c) => c._id === selectedCategory)?.name;
  const ageName = ageRanges?.find((a) => a._id === selectedAge)?.label;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {/* Category Dropdown */}
      <div className="relative w-full md:w-auto">
        <button
          onClick={() => {
            setShowCategoryDropdown(!showCategoryDropdown);
            setShowAgeDropdown(false);
          }}
          className={cn(
            "w-full md:w-auto flex items-center justify-between md:justify-center gap-3 font-mono text-xs uppercase tracking-[0.15em]",
            "border border-[#C6A96B]/30 px-5 py-3 transition-all duration-300",
            "hover:border-[#C6A96B]/60 hover:bg-[#C6A96B]/5",
            showCategoryDropdown && "border-[#C6A96B]/80 bg-[#C6A96B]/10"
          )}
        >
          <span className="text-foreground/70">
            {categoryName || "Select Category"}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-[#C6A96B]/60 transition-transform duration-300",
              showCategoryDropdown && "rotate-180"
            )}
            strokeWidth={1.5}
          />
        </button>

        {showCategoryDropdown && (
          <div className="absolute top-full left-0 mt-2 w-full md:min-w-[240px] bg-[#F5EFE6] dark:bg-[#141210] border border-[#C6A96B]/20 shadow-lg z-50">
            {categories?.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategorySelect(cat._id)}
                className={cn(
                  "w-full text-left px-5 py-3 font-mono text-xs uppercase tracking-[0.15em]",
                  "border-b border-[#C6A96B]/10 last:border-b-0",
                  "transition-colors duration-200",
                  selectedCategory === cat._id
                    ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                    : "text-foreground/70 hover:bg-[#C6A96B]/5 hover:text-[#C6A96B]"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Age Range Dropdown */}
      <div className="relative w-full md:w-auto">
        <button
          onClick={() => {
            setShowAgeDropdown(!showAgeDropdown);
            setShowCategoryDropdown(false);
          }}
          className={cn(
            "w-full md:w-auto flex items-center justify-between md:justify-center gap-3 font-mono text-xs uppercase tracking-[0.15em]",
            "border border-[#C6A96B]/30 px-5 py-3 transition-all duration-300",
            "hover:border-[#C6A96B]/60 hover:bg-[#C6A96B]/5",
            showAgeDropdown && "border-[#C6A96B]/80 bg-[#C6A96B]/10"
          )}
        >
          <span className="text-foreground/70">
            {ageName || "Select Era"}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-[#C6A96B]/60 transition-transform duration-300",
              showAgeDropdown && "rotate-180"
            )}
            strokeWidth={1.5}
          />
        </button>

        {showAgeDropdown && (
          <div className="absolute top-full left-0 mt-2 w-full md:min-w-[240px] bg-[#F5EFE6] dark:bg-[#141210] border border-[#C6A96B]/20 shadow-lg z-50">
            {ageRanges?.map((era) => (
              <button
                key={era._id}
                onClick={() => handleAgeSelect(era._id)}
                className={cn(
                  "w-full text-left px-5 py-3 font-mono text-xs uppercase tracking-[0.15em]",
                  "border-b border-[#C6A96B]/10 last:border-b-0",
                  "transition-colors duration-200",
                  selectedAge === era._id
                    ? "bg-[#C6A96B]/10 text-[#C6A96B]"
                    : "text-foreground/70 hover:bg-[#C6A96B]/5 hover:text-[#C6A96B]"
                )}
              >
                {era.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}