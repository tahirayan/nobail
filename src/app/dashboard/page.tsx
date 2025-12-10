import Events from "@/components/widgets/events";
import Venues from "@/components/widgets/venues";

export default function Dashboard() {
  return (
    <div className="grid gap-4">
      <Venues />
      <Events />
    </div>
  );
}
