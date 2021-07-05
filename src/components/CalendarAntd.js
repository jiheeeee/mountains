import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Layout, Calendar, List, Avatar } from 'antd';
import { CheckOutlined, GiftFilled } from '@ant-design/icons';
import './CalendarAntd.css';
import store from '../store';
import axios from 'axios';

const style = makeStyles({
    root: {
        flexGrow: 1,
    }
});

//List.Item.Meta에 색 입히기 style={{background : "#87e8de"}} 민트
const CalendarAntd = (value) => {
    const classes = style();
    const [currentDate, setcurrentDate] = useState(0);
    const [currentMonth, setcurrentMonth] = useState(0);
    const [Event, setEvent] = useState('');
    const [todoList, setTodoList] = useState([]);
    let baseUrl = "http://localhost:8000"

    useEffect(() => {
        let tmp = new Date();
        setcurrentDate(tmp.getDate());
        setcurrentMonth(tmp.getMonth());
        console.log('Today is ', currentMonth + 1, '/', currentDate);
    }, [currentDate]);
    //month : 실제보다 1 작음
    useEffect(() => {
        store.subscribe(() => {
            const todoListfromStore = store.getState().todoList;
            for(let i=0; i<todoListfromStore.length; i++){
                setTodoList(todoListfromStore);
            }
        })
    }, []);
    /*const JsonData = [
        {
            month: currentMonth,
            date: currentDate,
            reserves: [
                { icon: <GiftFilled />, title: 'TODAY~!', color: '#ffc53d' }
            ]
        },
        {
            month: 5,
            date: 27,
            reserves: [
                { icon: <CheckOutlined />, title: 'test1', color: "#87e8de" },
                { title: 'test2' },
                { title: 'test3' },
            ]
        },
        {
            month: 5,
            date: 30,
            reserves: [
                { title: '월급날' },
            ]
        }
    ]
    <List.Item.Meta avatar={item.icon !== undefined ? <Avatar gap={2} size={20} icon={item.icon} /> : null} title={item.title} style={{ textAlign: 'right', paddingRight: 70 }} />
*/

    function dateCellRender(value) {
        const listData = loadScheduleData(value);
        return (
            <List itemLayout="horizontal" dataSource={listData} renderItem={item => (
                <List.Item style={{ padding: 0, margin: 0, background: item.color }}>
                    <List.Item.Meta title={item.title}/>
                </List.Item>
            )}>
            </List>
        );
    }
    const loadScheduleData = (value) => {
        let listData = [{ title: '' }];
        for (let i = 0; i < todoList.length; i++) {
            let event = todoList[i].due.split('. ');
            let month = Number(event[1] -1);
            let date = Number(event[2].replace('.',''));
            if ((value.month() === month) && (value.date() === date)) {
                listData.push({title : todoList[i].title});
                console.log('todoList : ', todoList);
            }
        }
        return listData || [];
    }

    return (
        <Layout className={classes.root}>
            <Calendar dateCellRender={dateCellRender}></Calendar>
        </Layout>
    )
}
export default CalendarAntd