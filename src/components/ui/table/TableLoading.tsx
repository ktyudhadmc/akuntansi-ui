import { BeatLoader } from "react-spinners";

interface Props {
  colSpan?: number;
}

export default function TableLoading({ colSpan = 1 }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-16">
        <div className="sweet-loading">
          <BeatLoader color="var(--color-brand-600)" />
        </div>
      </td>
    </tr>
  );
}
