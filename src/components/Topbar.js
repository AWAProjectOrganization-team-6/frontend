import '../styles/Topbar.scss';
export default function Topbar(){

    return(
        <div className = 'background'>
            <div className = 'logo'>
                DR D. E. Livery
            </div>
            <div>
                <input className = 'searchbar' placeholder = 'Search'/>
            </div>
            <div className = 'buttons'>
                <button className = 'loginbutton'> Login </button>
                <button className = 'registerbutton'> Register </button>
            </div>
        </div>
    );
}