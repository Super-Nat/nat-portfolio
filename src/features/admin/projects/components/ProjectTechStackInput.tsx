import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useFormContext } from "react-hook-form";
import { useTechStack } from "../hooks/useTechStack";

export function ProjectTechStackInput() {
  const { techStack, isLoading } = useTechStack();
  const anchor = useComboboxAnchor();
  const { watch, setValue } = useFormContext();
  const value = watch("tech_stack");
  const techStackOptions = techStack?.map((tech) => ({
    label: tech.name,
    value: tech.id,
  }));

  return (
    <Combobox
      items={techStackOptions}
      multiple
      autoHighlight
      value={value}
      onValueChange={(value) => {
        setValue("tech_stack", value);
      }}
    >
      <ComboboxChips ref={anchor} className="w-full ">
        <ComboboxValue>
          {value?.map((item: string) => (
            <ComboboxChip key={item}>
              {techStack?.find((tech) => tech.id === item)?.name}
            </ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
