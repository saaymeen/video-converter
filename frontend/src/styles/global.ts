import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	body, h1, h2, h3, h4, h5, h6, p, ol, ul, a {
		margin: 0;
		padding: 0;
		font-weight: normal;
	}
	
	#app {
		display: flex;
		min-height: 100vh;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	li {
		list-style-type: none;
	}
	
	a {
		text-decoration: none;
	}

`;

export default GlobalStyle;
