import SearchBar from './component/Navbar2/SPSearchbar'
import ItemBody from './component/ItemBody/ItemBody'
import Infobar from '../../components/Navbar/Infobar/Infobar'

import './ChosenItem.scss'

export default function SingleItem() {
    return(
        <div className="main">
            <Infobar />
            <SearchBar />
            <ItemBody />
        </div>
    )
}