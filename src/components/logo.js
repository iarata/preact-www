import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Logo extends Component {
	state = { i: 0, hover: false };

	hover = () => {
		this.setState({ hover: true });
	};

	hoverOut = () => {
		this.setState({ hover: false });
	};

	frame = () => {
		this.timer = null;
		if (!this.mounted) return;
		this.setState({ i: this.state.i + 1 }, this.next);
	};

	next = () => {
		let { hover } = this.state;
		if (!this.mounted || !hover || this.timer) return;
		this.timer = (requestAnimationFrame || setTimeout)(this.frame, 15);
	};

	contextMenu = e => {
		e.preventDefault();
		route('/branding', false);
	};

	componentDidMount() {
		this.mounted = true;
		this.startTimer = setTimeout(this.next, 5000);
	}

	componentWillUnmount() {
		clearTimeout(this.startTimer);
		(cancelAnimationFrame || clearTimeout)(this.timer);
		this.mounted = this.timer = false;
	}

	componentDidUpdate() {
		this.next();
	}

	renderEllipse(fg, deg, offset) {
		let gapLength = Math.sin((offset / 500) * Math.PI) * 30 + 60;
		let lineLength = 894 / 2 - gapLength;
		return (
			<ellipse
				cx="0"
				cy="0"
				rx="75px"
				ry="196px"
				stroke-width="16px"
				stroke-dasharray={`${lineLength} ${gapLength}`}
				stroke-dashoffset={
					offset * 10 + Math.sin((offset / 100) * Math.PI) * 200
				}
				fill="none"
				stroke={fg}
				transform={`rotate(${deg})`}
			/>
		);
	}

	render(
		{
			inverted = false,
			text = false,
			fg = 'white',
			bg = '#673ab8',
			component,
			...props
		},
		{ i }
	) {
		let touch =
			typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1;
		if (inverted) [bg, fg] = [fg, bg];

		return (
			<svg
				class="logo"
				width={!text && '34px'}
				height="34px"
				viewBox={`-256 -256 ${text ? 1800 : 512} 512`}
				style="display:inline-block; margin:-.25em 0 0; vertical-align:middle;"
				onMouseover={!touch && this.hover}
				onMouseout={!touch && this.hoverOut}
				onContextMenu={this.contextMenu}
				{...props}
			>
				<path
					d="M0,-256 221.7025033688164,-128 221.7025033688164,128 0,256 -221.7025033688164,128 -221.7025033688164,-128z"
					fill={bg}
				/>
				{this.renderEllipse(fg, 52, i)}
				{this.renderEllipse(fg, -52, -0.7 * i)}
				<circle cx="0" cy="0" r="34" fill={fg} />
				{text && (
					<path
						fill="white"
						d="M289.85 25.25L289.85 125L272 125L272-122.63L335.88-122.63Q379.45-122.63 401.59-103.55Q423.73-84.48 423.73-49.13Q423.73-32.85 417.69-19.20Q411.65-5.55 400.27 4.34Q388.90 14.22 372.63 19.74Q356.35 25.25 335.88 25.25L289.85 25.25M289.85 10.90L335.88 10.90Q352.33 10.90 365.27 6.35Q378.23 1.80 387.24-6.25Q396.25-14.30 401.06-25.24Q405.88-36.18 405.88-49.13Q405.88-77.65 388.29-93.05Q370.70-108.45 335.88-108.45L289.85-108.45L289.85 10.90ZM497.58 13.00L497.58 125L479.73 125L479.73-122.63L542.90-122.63Q585.78-122.63 606.95-106.09Q628.13-89.55 628.13-57.53Q628.13-43.35 623.23-31.63Q618.33-19.90 609.14-11.06Q599.95-2.23 587 3.46Q574.05 9.15 557.78 10.90Q561.98 13.52 565.30 17.90L650.53 125L634.95 125Q632.15 125 630.14 123.95Q628.13 122.90 626.20 120.45L546.93 20.00Q543.95 16.15 540.54 14.57Q537.13 13.00 529.95 13.00L497.58 13.00M497.58-0.30L540.63-0.30Q557.08-0.30 570.11-4.24Q583.15-8.18 592.16-15.53Q601.18-22.88 605.90-33.20Q610.63-43.53 610.63-56.48Q610.63-82.90 593.30-95.68Q575.98-108.45 542.90-108.45L497.58-108.45L497.58-0.30ZM843.73-122.63L843.73-107.75L713.35-107.75L713.35-7.65L821.85-7.65L821.85 6.87L713.35 6.87L713.35 110.13L843.73 110.13L843.73 125L695.33 125L695.33-122.63L843.73-122.63ZM1088.55 125L1074.73 125Q1072.28 125 1070.70 123.69Q1069.13 122.38 1068.25 120.28L1039.03 48.35L917.40 48.35L888.35 120.28Q887.65 122.20 885.90 123.60Q884.15 125 881.70 125L868.05 125L969.38-122.63L987.23-122.63L1088.55 125M922.83 35.05L1033.78 35.05L983.20-90.08Q981.98-93.05 980.75-96.81Q979.53-100.58 978.30-104.78Q977.08-100.58 975.85-96.81Q974.63-93.05 973.40-89.90L922.83 35.05ZM1302.40 83.35Q1304.15 83.35 1305.38 84.57L1312.38 92.10Q1304.67 100.33 1295.58 106.89Q1286.47 113.45 1275.71 118.09Q1264.95 122.72 1252.09 125.26Q1239.22 127.80 1223.83 127.80Q1198.10 127.80 1176.66 118.79Q1155.22 109.78 1139.91 93.24Q1124.60 76.70 1116.03 53.25Q1107.45 29.80 1107.45 1.10Q1107.45-27.08 1116.29-50.35Q1125.13-73.63 1141.14-90.34Q1157.15-107.05 1179.46-116.24Q1201.78-125.43 1228.72-125.43Q1242.20-125.43 1253.40-123.41Q1264.60-121.40 1274.31-117.64Q1284.03-113.88 1292.60-108.28Q1301.17-102.68 1309.40-95.33L1303.97-87.45Q1302.58-85.35 1299.60-85.35Q1298.03-85.35 1295.58-87.19Q1293.13-89.03 1289.36-91.74Q1285.60-94.45 1280.26-97.69Q1274.92-100.93 1267.58-103.64Q1260.22-106.35 1250.60-108.19Q1240.97-110.03 1228.72-110.03Q1206.15-110.03 1187.25-102.24Q1168.35-94.45 1154.70-80.01Q1141.05-65.58 1133.44-45.01Q1125.83-24.45 1125.83 1.10Q1125.83 27.35 1133.35 48.00Q1140.88 68.65 1154.17 82.91Q1167.47 97.17 1185.59 104.79Q1203.70 112.40 1224.88 112.40Q1238.17 112.40 1248.59 110.65Q1259 108.90 1267.75 105.40Q1276.50 101.90 1284.03 96.82Q1291.55 91.75 1298.90 84.92Q1299.78 84.22 1300.56 83.79Q1301.35 83.35 1302.40 83.35ZM1530.42-122.63L1530.42-107.40L1443.45-107.40L1443.45 125L1425.60 125L1425.60-107.40L1338.10-107.40L1338.10-122.63L1530.42-122.63Z"
					/>
				)}
			</svg>
		);
	}
}

export const InvertedLogo = props => <Logo inverted {...props} />;
