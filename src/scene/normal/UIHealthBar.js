import React from "react";
import {connect} from "react-redux";
import {Row, Col, Progress, Popover} from 'antd';
import {setPlayerValue} from "../../store/player-actions";

class UIHealthBar extends React.Component {

  constructor(props) {
    super(props);
    setTimeout(this.addBlood.bind(this), this.props.ADD_time);
  }

  addBlood() {
    const {blood, useblood} = this.props;
    if (useblood < 0)
      return;
    if (useblood > blood || useblood + this.props.ADD_blood > blood) {
      setPlayerValue({
        useblood: blood
      });
    } else {
      setPlayerValue({
        useblood: useblood + this.props.ADD_blood
      });
    }
    setTimeout(this.addBlood.bind(this), this.props.ADD_time);
  }

  render() {
    const {blood, useblood} = this.props;
    const percent = 100 * useblood / blood;
    const active = useblood < blood;
    const info = `${useblood}/${blood}`;
    return (
      <Popover content={info} title="生命">
        <Row>
          <Col span={6}>
            生命：
          </Col>
          <Col span={18}>
            {
              active ?
                <Progress percent={percent} showInfo={false} status="active"/>
                :
                <Progress percent={percent} showInfo={false}/>
            }
          </Col>
        </Row>
      </Popover>
    );
  }
}

export default connect((state, props) => {
  return {
    blood: state.player.blood,
    useblood: state.player.useblood,
    ADD_blood: state.settings.ADD_blood,
    ADD_time: state.settings.ADD_time,
  };
})(UIHealthBar);
