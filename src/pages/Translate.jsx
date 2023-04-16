import React, { useState, useEffect } from "react";
import { Input, Card, Layout, Select } from "antd";
import axios from "axios";
import request_marh from "../components/API/server";
import { EditOutlined, SoundOutlined } from "@ant-design/icons";
import { Button, Tooltip, Skeleton, message, Steps, Spin, Switch } from "antd";
import Anomation from "./style";
import logo from "../assets/logowhite.png";
import VideoList from "./VideoList";


const { TextArea } = Input;
const { Content } = Layout;
const Translated = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [LanguageSource, setLanguageSource] = useState(
    "Аударылатын тілді таңдаңыз"
  );
  const [LanguageTarget, setLanguageTarget] = useState(
    "Аударғыңыз келетін тілді таңдаңыз"
  );
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("success");
  const [num, setnum] = useState(0);
  const [load, setload] = useState(false);
  const [voice, setVoice] = useState(false);
  const [inputOne, setInputOne] = useState("");
  const [language, setLanguage] = useState([]);
  const [languageOut, setLanguageOut] = useState([]);
  const [loaing, setLoaing] = useState(true);
  const [sound, setPlaySound] = useState(false);
  useEffect(() => {
    axios
      .get(request_marh.url + request_marh.getLanguage)
      .then((res) => {
        setLanguage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(request_marh.url + request_marh.getLanguageOut)
      .then((res) => {
        setLanguageOut(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  setTimeout(() => setLoaing(false), 3000);

  const Translated = () => {
    axios
      .post(request_marh.url, {
        targetLanguageCode: LanguageTarget,
        sourceLanguageCode: LanguageSource,
        text: inputOne,
      })
      .then((response) => {
        if (response.data["code"] === 201) {
          setVoice(true);
          setStatus("success");
          setText(response.data["text"]);
          setnum(3);
        } else setText("Аударма мүмкін емес аударма қатесі орын алды");
        setload(false);
        setStatus("error");
      })
      .catch((error) => {
        error.response.status === 400
          ? messageApi.info(
              "Сіз тілдерді дұрыс енгізбедіңіз немесе мәтін енгізбедіңіз"
            )
          : messageApi.info("Сервер қатесі");

        setload(false);
        setStatus("error");
      });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setLanguageSource(value);
    setStatus("success");
    setnum(1);
  };
  const onChange2 = (value) => {
    console.log(`selected ${value}`);
    setLanguageTarget(value);
    setStatus("success");
    setnum(2);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onSearch2 = (value) => {
    console.log("search:", value);
  };
  const functions = (e) => {
    setInputOne(e.target.value);
    if (e.target.value === "") {
      setText([]);
    }
  };

  return (
    <>
      {loaing ? (
        <Anomation />
      ) : (
        <>
          <Card title={<img className="pb-6 pt-6 pl-2" src={logo} width="130px" alt="logo" />}>
            <Content>
              <Card title="Аудару алгоритімі">
                <Steps
                  size="small"
                  current={num}
                  status={status}
                  items={[
                    {
                      title: "Аударма тілін таңдаңыз",
                    },
                    {
                      title: "Қай тілге аудару керектігін таңдаңыз",
                    },
                    {
                      title: "Аудару түймесін басыңыз",
                    },
                  ]}
                />
              </Card>
              {contextHolder}
              <Card
                title={LanguageSource}
                extra={
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Аударылатын тілді таңдаңыз"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={language}
                  />
                }
              >
                <TextArea
                  rows={5}
                  placeholder="Мен аударамын"
                  onChange={(event) => functions(event)}
                />
              </Card>

              <Card
                title={LanguageTarget}
                extra={
                  <Select
                    showSearch
                    placeholder="Аударылатын тілді таңдаңыз"
                    optionFilterProp="children"
                    onChange={onChange2}
                    onSearch={onSearch2}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={languageOut}
                  />
                }
              >
                {load ? (
                  <Skeleton active />
                ) : (
                  <TextArea
                    rows={5}
                    placeholder="Мен аударманы шығарамын"
                    value={text}
                  />
                )}

                <br />
                <Tooltip title="Аудару">
                  <Button
                    style={{
                      margin: "0 auto",
                      display: "block",
                      marginTop: 20,
                    }}
                    onClick={() => {
                      setload(true);
                      Translated();
                    }}
                    danger
                    icon={<EditOutlined />}
                  >
                    {" "}
                    Аудару{" "}
                  </Button>
                </Tooltip>

                {voice ? (
                  sound ? (
                    <Spin spinning={true} delay={500} />
                  ) : (
                    <Tooltip title="Ауызша айту">
                      <Button
                        icon={<SoundOutlined />}
                        onClick={() => {
                          setPlaySound(true);
                          axios
                            .post(
                              "https://developer.voicemaker.in/voice/api",
                              {
                                Engine: "neural",
                                VoiceId: "ai3-kk-KZ-Batima",
                                LanguageCode: "kk-KZ",
                                Text: text,
                                OutputFormat: "mp3",
                                SampleRate: "48000",
                                Effect: "default",
                                MasterSpeed: "0",
                                MasterVolume: "0",
                                MasterPitch: "0",
                              },
                              {
                                headers: {
                                  Authorization:
                                    "Bearer ad4590e0-b597-11ed-91a8-bf249a828278",
                                },
                              }
                            )
                            .then((response) => {
                              let audio = new Audio(response.data.path);
                              audio.play();

                              setPlaySound(false);
                            })
                            .catch((error) => {
                              console.log(error);
                              setPlaySound(false);
                            });
                        }}
                      />
                    </Tooltip>
                  )
                ) : (
                  <Tooltip title="Ауызша айту">
                    <Button disabled icon={<SoundOutlined />} />
                  </Tooltip>
                )}
              </Card>
              <VideoList />
            </Content>
          </Card>
        </>
      )}
    </>
  );
};

export default Translated;
