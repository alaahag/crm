import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Clients from './components/Clients';
import Actions from './components/Actions';
import Analytics from './components/Analytics';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
		main: '#2d3940'
		}
	}
});

export default function App() {
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<NavBar />
				<div className="App-header">
					<Switch>
						<Route path="/" exact render={() => <Clients />} />
						<Route path="/clients" exact render={() => <Clients />} />
						<Route path="/actions" exact render={() => <Actions />}/>
						<Route path="/analytics" exact render={() => <Analytics />} />
						<Route render={() => <h2>Page not found!</h2>} />
					</Switch>
				</div>
			</MuiThemeProvider>
		</Router>
	);
};