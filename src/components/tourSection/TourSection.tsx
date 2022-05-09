import SectionHeading from "components/sectionHeading/SectionHeading";
import TourList from "./TourList";

type Props = {};

function TourSection({}: Props) {
  return (
    <section className="section">
      <SectionHeading content="Cảm hứng cho chuyến đi tiếp theo của bạn" />
      <TourList />
    </section>
  );
}

export default TourSection;
