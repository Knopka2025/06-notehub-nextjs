import { useState } from "react";
import toast from "react-hot-toast";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleSearch = (query: string) => {
    const trimmed = query.trim();

    if (!trimmed) {
      toast.error("Enter text to search!");
      return;
    }

    onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(value);
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (!newValue.trim()) {
      //! якщо поле порожнє — повертаємо початковий стан
      onSearch("");
      return;
    }

    if (newValue.trim().length >= 3) { //! Починаючи з третього сиволу 
      onSearch(newValue.trim());
    }
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}