import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import Layout from "../../../Layout";
import "../../../style.css";
import LeftCornerPiece from "../LeftCornerPiece";
import RightCornerPiece from "../RightCornerPiece";
import Button from "../Button";
import { getAllNewsArticles } from "../../../utils/levelsData";
import ClickableCard from "../ClickableCard";

export default function EndScreen() {
  const newsArticles = getAllNewsArticles();
  return (
    <Layout>
      <div className="end-screen">
        <h1>Gefeliciteerd je hebt Packet Panic voltooid!</h1>
        <div className="row">
          <div className="card">
            <p>
              Hopelijk heb je het gevoel gehad steeds achter de feiten aan te
              lopen. Wat als je meldingen krijgt dat een website niet
              beschikbaar is? Hoe weet je zeker dat een door het BGP
              aangekondigde route betrouwbaar is?
            </p>
            <p>
              Packet Panic is bewust een frustrerend spel. Omdat BGP-hijacks een
              frustrerende realiteit zijn. RPKI is een goede oplossing, maar
              werkt pas echt goed bij 100% adoptie. Daar zijn we nog niet. De
              teller blijft vooralsnog steken op 50%
            </p>
            <p>
              Nu weet jij dat ook. Dus help mee om RKPI adoptie naar 100% te
              krijgen.
            </p>
            <p>Bedankt voor het spelen van Packet Panic.</p>
          </div>
          <div className="blue-card">
            <h2>Wat kun je nu verder doen</h2>
            <span>
              <p className="subtitle">Check RPKI-adoptie </p>
              <p>
                ga naar www.internet.nl en controleer hoe het zit met RPKI
                adoptie van je werkgever, je gemeente of je voetbalclub.
              </p>
            </span>
            <span>
              <p className="subtitle">Deel je kennis</p>
              <p>
                Vertel anderen over de risico's van BGP-hijacking. Duw
                bijvoorbeeld Packet Panic onder hun neus.
              </p>
            </span>
            <span>
              <p className="subtitle">Verdiep je kennis </p>
              <p>
                Bekijk de zusterprojecten van Packet Panic, die inzicht bieden
                in andere onderdelen van de infrastructuur van het internet.
              </p>
            </span>
          </div>
        </div>
        <div className="row">
          <h2>Terugblik krantenknipsels</h2>
          <div className="news">
            {newsArticles.map((article, idx) => (
              <ClickableCard
                onClick={() => window.open(article.readMoreLink, "_blank")}
                className="news-article"
                key={idx}
              >
                <div className="image">
                  <img src={article.imageUrl} alt={article.title} />
                </div>
                <h3>{article.title}</h3>
              </ClickableCard>
            ))}
          </div>
        </div>
        <div className="buttons">
          <Button onClick={() => window.location.reload()}>
            Opnieuw spelen
          </Button>
          <Button color="blue" onClick={() => {}}>
            Interactieve ervaringen
          </Button>
        </div>
      </div>
      <div className="corner-pieces">
        <LeftCornerPiece />
        <RightCornerPiece />
      </div>
    </Layout>
  );
}
