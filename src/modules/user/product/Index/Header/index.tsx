import CardStatistic from "@components/ui/card/CardStatistic";
// import ProductHeaderCard from "./HeaderCard";
import { formatIDRLocale } from "@helpers/currency";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";

export default function ProductHeader() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {/* <ProductHeaderCard title="Stok tersedia" variant="success" count={0} />
      <ProductHeaderCard
        title="Stok segera habis"
        variant="warning"
        count={0}
      />
      <ProductHeaderCard title="Stok habis" variant="danger" count={0} />
      <ProductHeaderCard title="Gudang" variant="primary" count={0} /> */}

          <CardStatistic
            title="Stok tersedia"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="success"
            icon={<AiOutlineCheckCircle />}
          />
          <CardStatistic
            title="Stok segera habis"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="warning"
            icon={<AiOutlineExclamationCircle />}
          />
          <CardStatistic
            title="Stok habis"
            value={formatIDRLocale(0, { withSymbol: true })}
            variant="danger"
            icon={<AiOutlineCloseCircle />}
          />
          <CardStatistic
            title="Gudang"
            value={formatIDRLocale(0, { withSymbol: true })}
            icon={<AiOutlineHome />}
          />
        </div>
      </div>
    </div>
  );
}
