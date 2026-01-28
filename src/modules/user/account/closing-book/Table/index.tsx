import Button from "@components/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function COAClosingBook() {
  const navigate = useNavigate();

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Button size="sm" onClick={() => navigate("../locking-periods")}>
        <span>Mulai kunci periode</span>
      </Button>
      <Button size="sm" variant="outline" onClick={() => navigate("create")}>
        <span>Mulai tutup buku</span>
      </Button>
    </div>
  );
}
