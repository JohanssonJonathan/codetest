import React from "react";
import "../../css/design/design.css";
import knowitLogo from "../../img/knowit_white.svg";
import lakeImage from "../../img/knowit-karriarmojligheter-2.jpg";
import teamworkImage from "../../img/knowit-karriarmojligheter-3.jpg";
import employeImage from "../../img/knowit-karriarmojligheter-1.jpg";
import iconMenu from "../../img/icon-menu.svg";

const MainContainer = () => {
  return (
    <div className="main-container">
      <div className="logo-with-menu-container">
        <img src={knowitLogo} alt="knowit" />
        <div id="icon-menu">
          <img src={iconMenu} alt="icon-menu" />
        </div>

        <ul>
          <li>Tjänster</li>
          <li>Kunder</li>
          <li>Kurser & event</li>
          <li>
            Jobba hos oss <div>75</div>
          </li>
          <li>Kontakt</li>
        </ul>
      </div>
    </div>
  );
};

const SloganAndIntroduction = () => {
  return (
    <div className="slogan-container">
      <h1>STARTING A NEW JOURNEY!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu.
      </p>
    </div>
  );
};

const WorkInfo = ({ image, header, children, link }) => (
  <div>
    <div className="image-container">
      <div>
        <img src={image} alt="img" />
      </div>
      <div>
        <h2>{header}</h2>
        <p>{children}</p>
        <div className="career-underline">
          <h4>{link}</h4>
        </div>
      </div>
    </div>
  </div>
);
const WorkOportunities = () => {
  return (
    <div className="below-container">
      <SloganAndIntroduction />
      <WorkInfo
        header="Förbättra världen"
        link="TA NÄSTA STEG I DIN KARRIÄR"
        image={lakeImage}
      >
        Vill du jobba för ett hållbart och mänskligt samhälle genom
        digitalisering och innovation? Hos oss driver du förändring och är med
        och formar framtiden med den senaste tekniken.
      </WorkInfo>

      <WorkInfo
        image={teamworkImage}
        header="Vi trivs på jobbet!"
        link="TRÄFFA VÅRA MEDARBETARE"
      >
        Våra medarbetare ger Knowit högsta betyg som arbetsplats och
        rekommenderar oss gärna för vänner och bekanta. Här berättar några
        kollegor om hur det är att arbeta hos oss.
      </WorkInfo>
      <WorkInfo
        image={employeImage}
        header="Utvecklas hos oss"
        link="SÖK JOBB PÅ KNOWIT"
      >
        Knowit är ett företag där kreativitet och innovation står i fokus. Hos
        oss har du alla möjligheter att utvecklas och växa som person samtidigt
        som du är del av ett stöttande team.
      </WorkInfo>
    </div>
  );
};
const Design = () => (
  <div className="flex-row">
    <MainContainer />
    <WorkOportunities />
  </div>
);

export default Design;
