import SearchBar from './component/Navbar2/SPSearchbar'
import ItemBody from './component/ItemBody/ItemBody'

import './ChosenItem.scss'

export default function SingleItem() {
    return(
        <div className="main">
            <SearchBar />
            <ItemBody />
        </div>
    )
}