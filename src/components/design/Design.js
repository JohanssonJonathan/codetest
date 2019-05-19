import React, { Component } from "react";
import "../../css/design/design.css";
import knowitLogo from "../../img/knowit_white.svg";
import lakeImage from "../../img/knowit-karriarmojligheter-2.jpg";
import teamworkImage from "../../img/knowit-karriarmojligheter-3.jpg";
import employeImage from "../../img/knowit-karriarmojligheter-1.jpg";
import iconMenu from "../../img/icon-menu.svg";
import background from "../../img/start_201811.jpg";

const Design = () => (
  <div className="flex-row">
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
    <div className="below-container">
      <div className="slogan-container">
        <h1>STARTING A NEW JOURNEY!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu.
        </p>
      </div>
      <div>
        <div className="image-container">
          <div>
            <img src={lakeImage} alt="lake" />
          </div>
          <div>
            <h2>Förbättra världen</h2>
            <p>
              Vill du jobba för ett hållbart och mänskligt samhälle genom
              digitalisering och innovation? Hos oss driver du förändring och är
              med och formar framtiden med den senaste tekniken.
            </p>
            <h4>TA NÄSTA STEG I DIN KARRIÄR</h4>
          </div>
        </div>
      </div>
      <div>
        <div className="image-container">
          <div>
            <img src={teamworkImage} alt="teamwork" />
          </div>
          <div>
            <h2>Vi trivs på jobbet!</h2>
            <p>
              Våra medarbetare ger Knowit högsta betyg som arbetsplats och
              rekommenderar oss gärna för vänner och bekanta. Här berättar några
              kollegor om hur det är att arbeta hos oss.
            </p>
            <h4>TRÄFFA VÅRA MEDARBETARE</h4>
          </div>
        </div>
      </div>
      <div>
        <div className="image-container">
          <div id="employe">
            <img src={employeImage} alt="employe" />
          </div>
          <div>
            <h2>Utvecklas hos oss</h2>
            <p>
              Knowit är ett företag där kreativitet och innovation står i fokus.
              Hos oss har du alla möjligheter att utvecklas och växa som person
              samtidigt som du är del av ett stöttande team.
            </p>

            <h4>SÖK JOBB PÅ KNOWIT</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Design;
