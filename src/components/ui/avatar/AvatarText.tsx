import getInitial from "@helpers/get-initial.helper";

interface Props {
  text: string;
  size?: string;
}

export default function AvatarText({ text, size = '20' }: Props) {
  return (
    <div
      className={`w-${size} h-${size} overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-[#465FFF]`}
    >
      <span className="flex items-center justify-center w-full h-full font-bold text-white">
        {getInitial(text)}
      </span>
    </div>
  );
}
