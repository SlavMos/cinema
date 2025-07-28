import React, { useEffect, useState } from "react";
import classNames from "classnames";
import s from "./VideoPlayer.module.css";

export default function VideoPlayer({ kpId }) {
  const [scriptHtml, setScriptHtml] = useState("");

  useEffect(() => {
    if (!kpId) return; // Если id нет, не делаем запрос

    const dataUrl = window.location.href;

    fetch(
      `https://pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=${kpId}&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer,torrent&url=${encodeURIComponent(
        dataUrl
      )}`
    )
      .then((res) => res.text())
      .then((data) => setScriptHtml(data.match(/<iframe.*<\/iframe>/gm)[1]));
  }, []);

  return (
    <div
      className={classNames("uitools", s.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    />
  );
}
