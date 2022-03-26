/*global chrome*/
import React, { useEffect, useState } from "react";
import data from "./data/members.json";

import logo from "./favicon.png";
import logoWhite from "./white_logo.png"

import './App.css';
import { Checkbox, Layout, Button } from 'antd';
const { Header, Content } = Layout;

function App() {

    const [url, setUrl] = useState('');
    const [ test, setTest ] = useState([]);

    useEffect(() => {

        chrome.storage.sync.get('checks', (results) => {
            if (results.checks) {
                setTest(results.checks)
            }
        })

        // const queryInfo = {active: true, lastFocusedWindow: true};
        // chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        //     const url = tabs[0].url;
        //     setUrl(url);
        // });
    }, []);

    const onChange = (e) => {
        if (test.indexOf(e.target.value) === -1) {
            setTest([...test, e.target.value]);
            chrome.storage.sync.set({ checks: [...test, e.target.value]});
        } else {
            setTest(test.filter(x => x !== e.target.value));
            chrome.storage.sync.set({ checks: test.filter(x => x !== e.target.value)});
        }
    }

    const onHandleClearAll = () => {
        setTest([]);
        chrome.storage.sync.clear();
    };

    return (
        <div className="olive">
            <Layout>
                <div style={{position: 'sticky', top: 0, zIndex: 100}}>
                    <Header style={{background: "white", textAlign: "center"}}>
                        <div style={{width: 40, height: 40, margin: '0 auto'}}>
                            <img src={logoWhite} style={{maxWidth: '100%'}}/>
                        </div>
                    </Header>
                    <div style={{textAlign: 'right', margin: 5}}>
                        <Button style={{borderRadius: 5, width: '100%'}} onClick={onHandleClearAll}>Clear</Button>
                    </div>
                </div>
                <Content>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: 20}}>
                        {
                            data.map(x => <Checkbox value={x.name} checked={test?.includes(x.name)} onChange={onChange} style={{marginLeft: 0}}>
                                <div className="member-name">{x.name}</div>
                            </Checkbox>)
                        }
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default App;
