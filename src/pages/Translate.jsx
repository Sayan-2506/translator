
import React, {useState,useEffect} from "react";
import { Input,Card, Layout,Select } from 'antd';
import axios from 'axios'
import request_marh from '../components/API/server'
import { message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Steps } from 'antd';

const { TextArea } = Input;
const { Content } = Layout;
const Translated =()=> {

    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('Вы некоректно ввели языки или не ввели текст');
      };
      const info2 = () => {
        messageApi.info('Ошибка сервера');
      };
    const[LanguageSource,setLanguageSource] = useState('Выбери язык который надо перевести')
    const[LanguageTarget,setLanguageTarget] = useState('Выбери язык на который надо перевести')
    const[text,setText] = useState([])
    const[Bool,setBool] = useState(false)
    const [inputOne, setInputOne] = useState('');

    useEffect(() =>{

        axios.post(request_marh.url,
            {
                targetLanguageCode: LanguageTarget,
                sourceLanguageCode: LanguageSource,
                text: inputOne,
            }
        ).then((response)=>{
          
            response.data['code'] === 201
            ?
            setText(response.data['text'])
            :
            setText('Не могу перевести произошла ошибка перевода')

        }).catch((error)=>{
            error.response.status === 400
            ?
            info()
            :
            info2()
            
        })
        },[Bool])

    const language =[
        {
          value: 'kk',
          label: 'Казахский',
        },
        {
          value: 'ru',
          label: 'Русский',
        },
        {
            value: 'kn',
            label: 'Каннадский',
        },
        {
            value: 'zh',
            label: 'Китайский',
        },
        {
            value: 'ar',
            label: 'Арабский',
        },       
        
       
      ];
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setLanguageSource(value)
      };
      const onChange2 = (value) => {
        console.log(`selected ${value}`);
        setLanguageTarget(value)
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
      const onSearch2 = (value) => {
        console.log('search:', value);
      };
      const functions = (e) => {
        setInputOne(e.target.value);
        if(e.target.value === ''){
            setText([])
        }

      };



      
    return(
        <>
        
        <Card title="Translate Soft by @Sanzhar Sapar">
        <Content >
        <Card title="Как переводить">
        <Steps
    size="small"
    current={2}
    items={[
      {
        title: 'Выбери язык перевода',
      },
      {
        title: 'Выбери на какой язык нужно перевести',
      },
      {
        title: 'Нажми на кнопку перевести',
      },
    ]}
  />
  </Card>
        {contextHolder}
        <Card title={LanguageSource}  extra={  <Select
            showSearch
            placeholder="Выбери язык для перевода"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={language}
          />} >
     
        <TextArea rows={5} placeholder="Я перевожу"  onChange={(event) => functions(event)} />
    </Card>


    <Card title={LanguageTarget} extra={<Select
        showSearch
        placeholder="Выбери язык для перевода"
        optionFilterProp="children"
        onChange={onChange2}
        onSearch={onSearch2}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={language}
      />} >
    <TextArea rows={5} placeholder="Я выведу перевод" value={text}/>
  <br/>
       <Tooltip title="Перевести">
       <Button style={{ 'width': '100%','margin':'5% 20px  20px 0' }} onClick={()=>setBool(!Bool)}   danger icon={<EditOutlined />} > Перевести </Button >
       </Tooltip>
       
    </Card>


       </Content>

       </Card>
       
       </>
      
    )
}

export default Translated;