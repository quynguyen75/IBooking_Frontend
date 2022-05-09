import Header from "../../../components/layout/Header";
import Main from "components/layout/Main";
import HeroSection from "components/hero/HeroSection";
import TourSection from "components/tourSection/TourSection";
import BecomeHostSection from "components/becomeHost/BecomeHostSection";
import Footer from "components/layout/Footer";
import Navigation from "components/layout/Navigation";
import SearchBlock from "components/searchBlock/SearchBlock";

type Props = {};

function Home({}: Props) {
  return (
    <>
      <Header />
      <Navigation />
      <Main>
        <SearchBlock />
        <HeroSection />
        <TourSection />
        <BecomeHostSection />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
