import Chip, { ChipProps } from '../chip/Chip';

interface ChipGroupProps {
  children?: React.ReactNode
  chipConfig?: Array<ChipProps>
}

export default function ChipGroup(props: ChipGroupProps) {

  return (
    <div className="flex flex-wrap justify-center mx-2 my-10">
      { props.children ?? props.chipConfig?.map((chip, index) => { return <Chip key={ index } { ...chip } /> }) }
    </div>
  );
}