import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import levelsData from "../../utils/levelsData";
import Button from "../Button/Button";
import Card from "../Card/Card";
import styles from "./LevelPicker.module.scss";

export default function LevelPicker() {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className={styles.levelPickerContent}>
        <h2 className={styles.title}>{t("level-picker.choose-level")}</h2>
        <div className={styles.cardWrapper}>
          {levelsData.map((item, index) => (
            <Card
              key={index}
              title={`${t("global.level")} ${item.id}`}
              action="go-to-level"
              cardLevelId={item.id}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            useGame.setState({ phase: "playing" });
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {t("global.back")}
        </Button>
      </div>
    </Layout>
  );
}
