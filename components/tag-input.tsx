"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
    className?: string;
}

export default function TagInput({ tags, onTagsChange, placeholder, suggestions = [], className }: TagInputProps) {
    const [input, setInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim().toLowerCase();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            onTagsChange([...tags, trimmedTag]);
        }
        setInput("");
        setShowSuggestions(false);
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input) {
            e.preventDefault();
            addTag(input);
        } else if (e.key === "Backspace" && !input && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };

    const filteredSuggestions = suggestions.filter(
        (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s.toLowerCase())
    );

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <motion.div
                        key={tag}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <Badge variant="secondary" className="gap-1 pl-3 pr-2 py-1.5 hover:bg-secondary/80 transition-colors">
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    </motion.div>
                ))}
            </div>
            <div className="relative group">
                <Input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(input.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={placeholder}
                    className="bg-secondary/50 border-input/50 focus:bg-background transition-all"
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-popover/95 backdrop-blur-sm border rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => addTag(suggestion)}
                                className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
