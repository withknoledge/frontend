import React, { Component, useState} from 'react'
import Container from '../components/Container';
import Chart from 'react-google-charts';
import { Typography } from '@material-ui/core';


const IP_ADDRESS = '10.10.123.49:3000';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            soilWater: 0,
            history: []
        }
    }
    componentDidMount = async () => {
        this.getData();
        this.turnOnWebSocket();
    }

    turnOnWebSocket = async () => {
        this.socket = new WebSocket(`ws://${IP_ADDRESS}/`);
        this.socket.onmessage = ({data}) => {
            console.log(data);
            data = JSON.parse(data);
            this.setState(state => {
                state.soilWater = data.humid;
                let element = Object.values(data).reverse();
                console.log(element);
                state.history.push(element);
                state.history.shift();
                return state;
            });
        };
    }

    getData = async () => {
        try {
            const historyRaw = JSON.parse(await (await fetch(`http://${IP_ADDRESS}/bydate?size=10`)).text());
            const history = historyRaw.map(item => Object.values(item).reverse());
            console.log(history);
            this.setState({history});
        } catch(err) {
            console.error(err);
        }
    }

    handleSoilWaterData = async ({soilWater}) => this.setState({soilWater})

    render() {
        let {soilWater, history} = this.state;
        let column = ['HUMID', 'HDATE'];
        return (
            <Container>
                <Typography variant="h4">현재 토양의 수분은...</Typography>
                <Typography variant="h3">{soilWater}%</Typography>
                <Chart
                    width={720}
                    height={600}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                    column,
                    ...history,
                    ]}
                    options={{
                    title: '기록',
                    chartArea: { width: '100%' },
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0,
                    },
                    vAxis: {
                        title: '',
                    },
                    }}
                    legendToggle
                />
                
            </Container>
        )
    }
}