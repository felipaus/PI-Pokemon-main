import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Nav from "../component/Nav";

configure({ adapter: new Adapter() });

describe("<Nav/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it("Deberia renderizar Dos <NavLink />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
  it('El primer NavLink debe tener el texto " " y cambiar la ruta hacia "/".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop("to")).toEqual("/");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual("");
      });
  it('El segundo NavLink debe tener el texto " " y cambiar la ruta hacia "/add"', () => {
    expect(wrapper.find(NavLink).at(1).prop("to")).toEqual("/add");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual("Agregar Pokemon");
  });
  it('El primer NavLink debe tener la imagen https://cdn-icons-png.flaticon.com/512/188/188918.png',()=>{
    expect(wrapper.find(NavLink).at(0).contains(<img src="https://cdn-icons-png.flaticon.com/512/188/188918.png" alt="pokebola inico" />)).toEqual(true);
  });
});
