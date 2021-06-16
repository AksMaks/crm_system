import React from 'react';
import s from'./NavBar.module.css';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ChangeMinimizedAC} from '../../../redux/NavBarReducer.js';

const MyLink = (props) => {
	return (
        <NavLink to={props.Link}>{props.Name}</NavLink>
	);
};
//<img className={s.Icon} src={"/Assets/Icons/NavBar/" + data.Icon}/>
class NavBar extends React.Component {
    constructor(props){
        super(props);
        if(this.props.User === null){
            alert("Navbar17")
            document.location.replace("/");
        };
        this.state = {
            LinkGroups: this.props.NavBar.LinkGroups.map((el)=>{
                return {...el, Minimized: false}
            })
        };
    }
	
    ChangeMinimized = (ind) => {
        let TempMinimized = ( this.state.LinkGroups[ind].Minimized )? false: true;
        let TempLinkGroups = this.state.LinkGroups.map(el => {
            return {...el, Minimized: false}
        });
        TempLinkGroups[ind].Minimized = TempMinimized;
        this.setState({
            LinkGroups: TempLinkGroups
        });
    }
    
    LinkGroups = (data, index) => {
        return( 
            <div className={s.LinkGroups} key={index}>
                <div className={s.Title} onClick={()=> this.ChangeMinimized(index)} key={index}>
                    <img 
                        className={s.Icon} 
                        src={"/Assets/Icons/NavBar/" + data.Icon} 
                        style={{filter: (data.Minimized? "invert(20%) sepia(34%) saturate(1105%) hue-rotate(339deg) brightness(102%) contrast(101%)": null)}}/>
                    <div className={s.Text} style={{color: (data.Minimized? "rgba(255, 182, 41, 1)": null)}}>{data.Title}</div>
                </div>
                {data.Minimized?
                    <ul>
                        {data.Links.map((el, ind)=> <li key={ind}><NavLink key={ind+"link"} activeClassName={s.activeLink} className={s.Link} to={el.Link}>{el.Name}</NavLink></li>)}
                    </ul>
                    : null}
            </div>
        );
    }
    
    goToPage = (Url) => {
        document.location.href = Url;
    }
    
	render(){
        if(!(this.props.CurrentBranch && this.props.User)) {
          alert("Navbar63")
          document.location.replace("/");
        }
        return (
            <div className={s.NavBar} style={{minHeight: window.innerHeight}}>
                <div className={s.CommonData}>
                    <div>Логотип</div>
                    <div><img src={"/Assets/Icons/NavBar/Logo.png"}/></div>
                    <div>{this.props.User.Name}</div>
                    <div>{this.props.CurrentBranch.Name + ". " + this.props.CurrentBranch.Address}</div>
                </div>
                <hr/>
                {this.state.LinkGroups.map(
                    (el, ind)=> {
                        if(this.props.User.Access[el.Key] || this.props.User.Access === null){
                            return this.LinkGroups(el, ind);
                        }else{
                            return null;
                        }
                    }
                )}
                <hr/>
                <div className={s.Footer}>
                    <div><a href="/" className={s.Exit}>Выйти</a></div>
                </div>
            </div>
	   )
    }
}

let mapStateToProps = (state) => {
	return {
		NavBar: state.NavBar,
        User: state.Common.User,
        CurrentBranch: state.Common.CurrentBranch
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
	}
};

let NavBarConteiner = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarConteiner;