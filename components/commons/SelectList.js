import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Overlay, ListItem, withTheme, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { getAvatarText } from '../../utils/helpers';

class SelectList extends Component {
  state = {
    selectedItem: null,
    showOverlay: false
  }

  isItemSelected = (item, index) => {
    if (this.state.selectedItem == null) return false;
    const { uniqueIdentifier } = this.props;
    const { selectedItem } = this.state;
    if (selectedItem == null) { return false; }
    if (uniqueIdentifier) { return (selectedItem[uniqueIdentifier] === item[uniqueIdentifier]); }
    return selectedItem[index] === item[index];
  }

  getIcon = (item, index, theme) => {
    if (this.isItemSelected(item, index)) { return <Ionicon name="md-checkmark" color={theme.colors.primary} />; }
    return null;
  }

  getListItemSelectedStyle = (item, index) => {
    if (this.isItemSelected(item, index)) { return { backgroundColor: '#eee' }; }
    return null;
  }

  getKey = (item, index) => {
    const { uniqueIdentifier } = this.props;
    if (item[uniqueIdentifier] && item[uniqueIdentifier].length > 0) {
      return item[uniqueIdentifier];
    }
    return index;
  }

  getAvatar = (item) => {
    if (item.avatar_url) { return { source: { uri: item.avatar_url } }; }
    return <Avatar rounded title={getAvatarText(item.name)} size="medium" />;
  }

  render() {
    const { title, onSelect, list, headerText, theme } = this.props;
    const headerTextDisplay = headerText;
    const { selectedItem } = this.state;
    return (
      <View style={{ width: '100%' }}>
        <Text style={{ width: '100%', fontWeight: 'bold', color: 'gray', backgroundColor: '#eee', lineHeight: 20, padding: 6 }}>{title}</Text>
        {
          selectedItem == null && (
            <ListItem
              title={title}
              subtitle="Tap to select or edit"
              subtitleStyle={styles.subtitle}
              leftIcon={<Ionicon name="md-help-circle-outline" size={24} />}
              rightTitle="Add"
              rightTitleStyle={{ color: theme.colors.primary }}
              onPress={() => this.setState({ showOverlay: true })}
            />
          )
        }
        {
          selectedItem != null && (
            <ListItem
              title={selectedItem.name}
              subtitle={selectedItem.subtitle}
              subtitleStyle={styles.subtitle}
              leftAvatar={{ source: { uri: selectedItem.avatar_url } }}
              rightTitle="Edit"
              rightTitleStyle={{ color: theme.colors.primary }}
              onPress={() => this.setState({ showOverlay: true })}
            />
          )
        }

        <Overlay
          isVisible={this.state.showOverlay}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
          onBackdropPress={() => this.setState({ showOverlay: false })}
        >
          <React.Fragment>
            <View>
              <Text style={{
                alignSelf: 'center',
                color: theme.colors.primary,
                lineHeight: 60,
                fontSize: 18
              }}
              >
                {headerTextDisplay}
              </Text>

              <ScrollView style={{ borderColor: 'lightgray', borderTopWidth: 1 }}>
                {
                list.map((item, index) => (
                  <ListItem
                    containerStyle={this.getListItemSelectedStyle(item, index)}
                    key={this.getKey(item, index)}
                    leftAvatar={this.getAvatar(item)}
                    title={item.name}
                    subtitle={item.subtitle}
                    subtitleStyle={styles.subtitle}
                    rightIcon={this.getIcon(item, index, theme)}
                    rightTitleStyle={{ color: theme.colors.primary }}
                    onPress={() => this.setState({ selectedItem: item })}
                  />
                ))
              }
              </ScrollView>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={{ flex: 1, padding: 5 }}>
                <Button
                  title="Cancel"
                  onPress={() => this.setState({ showOverlay: false })}
                  buttonStyle={{}}
                  type="outline"
                  icon={<Ionicon name="md-close" color={theme.colors.primary} size={16} style={{ marginRight: 5 }} />}
                />
              </View>
              <View style={{ flex: 1, padding: 5 }}>
                <Button
                  title="Done"
                  disabled={this.state.selectedItem == null}
                  buttonStyle={{}}
                  icon={<Ionicon name="md-checkmark-circle" color="white" size={16} style={{ marginRight: 5 }} />}
                  onPress={() => {
                    this.setState({ showOverlay: false });
                    if (onSelect instanceof Function) { onSelect(this.state.selectedItem); }
                  }}
                />
              </View>
            </View>
          </React.Fragment>
        </Overlay>

      </View>
    );
  }
}

const styles = {
  subtitle: {
    color: 'gray'
  }
};

SelectList.propTypes = {
  uniqueIdentifier: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  headerText: PropTypes.string,
};

SelectList.defaultProps = {
  headerText: 'Select an item'
};

export default withTheme(SelectList);
