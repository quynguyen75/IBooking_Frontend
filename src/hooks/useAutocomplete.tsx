import { useState } from "react";

interface IAutocompleArg {
  onChange: (data: string) => void;
  onSelect: (data: string) => void;
  onSearch: (data: string) => void;
}

export default function useAutocomplete(props: IAutocompleArg) {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onSearch = (searchText: string) => props.onSearch(searchText);
  const onSelect = (data: string) => props.onSelect(data);
  const onChange = (data: string) => props.onChange(data);

  return {
    searchText,
    options,
    onChange,
    onSearch,
    onSelect,
    setSearchText,
    setOptions,
  };
}
