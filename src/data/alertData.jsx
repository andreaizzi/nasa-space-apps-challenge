import { MdLandscape, MdWaves, MdEco } from "react-icons/md";


const alertsList = [
    {
        title: "Flash Flood Warning in Low-lying Areas",
        body: "Heavy rainfall expected in the next 24 hours. Secure livestock and move equipment to higher ground.",
        headerTitle: "Flood Alert",
        headerSmallTitle: "Immediate Action",
        icon: MdWaves,
        iconColor: "blue.500",
        bgIconColor: "blue.100"
    },
    {
        title: "Soil Erosion Risk on Hillside Farms",
        body: "Recent heavy rains have increased erosion risk. Consider implementing contour plowing or terracing.",
        headerTitle: "Terrain Alert",
        headerSmallTitle: "Moderate Risk",
        icon: MdLandscape,
        iconColor: "orange.500",
        bgIconColor: "orange.100"
    },
    {
        title: "Optimal Planting Conditions This Week",
        body: "Favorable soil moisture and temperature forecast. Ideal time for planting spring crops.",
        headerTitle: "Farmer Alert",
        headerSmallTitle: "Opportunity",
        icon: MdEco,
        iconColor: "green.500",
        bgIconColor: "green.100"
    }
]

export default alertsList;