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
  const frameworks = techStack?.map((tech) => tech.name) ?? [];
  const anchor = useComboboxAnchor();
  const { watch, setValue } = useFormContext();
  const value = watch("tech_stack");

  console.log(value);

  return (
    <Combobox
      items={frameworks}
      multiple
      autoHighlight
      value={value}
      onValueChange={(value) => {
        setValue("tech_stack", value);
      }}
    >
      <ComboboxChips ref={anchor} className="w-full ">
        <ComboboxValue>
          {value.map((item: string) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
