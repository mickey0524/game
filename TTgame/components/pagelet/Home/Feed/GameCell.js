import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Linking,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import LazyImage from '../../../common/LazyImage';
import { getImgUrl } from '../../../../utils/util';
import { totalHeight } from '../../../../conf/deviceParam';

export default class GameCell extends Component {
  constructor(props) {
    super(props);
    this.onPressDownload = this.onPressDownload.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mode != nextProps.mode ||
      this.props.gameInfo.isBrowered !== nextProps.isBrowered ||
      this.props.focusColor != nextProps.focusColor ||
      this.props.contentOffsetY != nextProps.contentOffsetY ||
      this.props.netInfo != nextProps.netInfo ||
      this.props.loadImgWithoutWifi != nextProps.loadImgWithoutWifi ||
      this.props.gameInfo.image_list[0] != nextProps.gameInfo.image_list[0]) { 
      return true;
    }    
    return false;
  }
  
  render() {
    let imgUrl = getImgUrl(this.props.gameInfo.image_list[0], 'FEED_CARD'),
      isNightMode = this.props.mode == 'night';
    return (
      <View style={styles.gameWrap}>
        <Text style={[styles.gameTitle, { color: this.props.gameInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#222'}]}>
          { this.props.gameInfo.title }
        </Text>
        <LazyImage imgUrl={imgUrl}
          isNightMode={isNightMode}
          imgStyle={styles.gameImg}
          netInfo={this.props.netInfo}
          loadImgWithoutWifi={this.props.loadImgWithoutWifi}          
          loadDirection={this.props.loadDirection}
          contentOffsetY={this.props.contentOffsetY} />
        <TouchableWithoutFeedback onPress={this.onPressDownload}>
          <View style={styles.gameInfo}>
            <Text style={[styles.gameName, { color: this.props.gameInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999'}]}>{ this.props.gameInfo.name }</Text>
            <View style={[styles.download, {backgroundColor: this.props.focusColor}]}>
              <Icon name='download' color={this.props.gameInfo.isBrowered ? '#999' : '#FFF'} size={8} />
              <Text style={[styles.downloadText, { color: this.props.gameInfo.isBrowered ? '#999' : '#FFF' }]}>APP下载</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  /**
   * 点击下载按钮，ios跳转appstore，android直接下载apk包
   */
  onPressDownload() {
    Linking.openURL(this.props.gameInfo.app_info.download_info.download_url);
  }
}

const styles = StyleSheet.create({
  gameWrap: {
    padding: 15,
  },
  gameTitle: {
    // color: '#222',
    fontSize: 19,
    marginBottom: 8,
  },
  gameImg: {
    width: 345,
    height: 194,
    backgroundColor: '#F4F5F6',
  },
  gameInfo: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameName: {
    fontSize: 12,
    // color: '#999999',
    marginRight: 5,
  },
  download: {
    width: 60,
    height: 14,
    // backgroundColor: '#2A90D7',
    borderRadius: 3,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  downloadText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
});
