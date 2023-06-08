import InfoBar from '../components/Navbar/Infobar/Infobar'
import SearchBar from './component/Navbar2/SPSearchbar'
import ItemBody from './component/ItemBody/ItemBody'

import './ChosenItem.scss'

export default function SingleItem() {
    return(
        <div className="main">
            <InfoBar />
            <SearchBar />
            <ItemBody />
        </div>
    )
}