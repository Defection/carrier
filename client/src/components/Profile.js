import React from "react";
import { Box, Form, TextInput, Button, Split } from "grommet";
import axios from "axios";
import List from "grommet/components/List";
import ListItem from "grommet/components/ListItem";
import EditIcon from "grommet/components/icons/base/Edit";
import Sidebar from "./Sidebar";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      bio: "",
      editEmail: false,
      editName: false,
      editBio: false
    };
    this.getUserProfile = this.getUserProfile.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeBio = this.changeBio.bind(this);
  }
  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile(event) {
    // console.log('here')
    axios
      .get("/getProfile", {
        params: {
          userID: this.props.match.params.id
        }
      })
      .then(response => {
        // console.log(response)
        this.setState({
          email: response.data.email,
          name: response.data.name,
          bio: response.data.bio
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      if (this.state.email.length > 1) {
        // console.log("enter press here! ");
        // console.log("enter press hxere! ");
        // console.log(this.state.name);
        axios
          .post("/saveProfile", {
            data: this.state,
            user: this.props.match.params.id
          })
          .then(response => {
            // console.log(response)
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  changeEmail() {
    this.setState({ editEmail: true });
  }

  changeName() {
    this.setState({ editName: true });
  }

  changeBio() {
    this.setState({ editBio: true });
  }

  render() {
    // console.log("This runs when profile is rendered");
    return (
      <Split flex="right" separator={false} fixed={false}>
        <Sidebar />
        <Box justify="center" align="start" pad="medium">
          <div style={{ width: "100%" }}>
            <h1>Settings</h1>
            <List
              selectable={true}
              onSelect={() => {}}
              style={{ width: "100%" }}
            >
              <ListItem
                justify="between"
                separator="horizontal"
                style={{ marginBottom: "5px" }}
              >
                <span>
                  <h4>
                    <b>
                      Name{this.state.editName === false ? (
                        <p>{`${this.state.name}`}</p>
                      ) : (
                        <Form>
                          <TextInput
                            onDOMChange={e => {
                              this.setState({ name: e.target.value });
                            }}
                            onKeyPress={this.handleKeyPress}
                          />
                        </Form>
                      )}
                    </b>
                  </h4>
                </span>
                <span className="secondary">
                  <Button
                    icon={<EditIcon />}
                    label="Edit Name"
                    onClick={() => {
                      this.changeName();
                    }}
                  />
                </span>
              </ListItem>
              <ListItem justify="between">
                <span>
                  <h4>
                    <b>
                      Email{this.state.editEmail === false ? (
                        <p>{`${this.state.email}`}</p>
                      ) : (
                        <Form>
                          <TextInput
                            onDOMChange={e => {
                              this.setState({ email: e.target.value });
                            }}
                            onKeyPress={this.handleKeyPress}
                          />
                        </Form>
                      )}
                    </b>
                  </h4>
                </span>
                <span className="secondary">
                  <Button
                    icon={<EditIcon />}
                    label="Edit Email"
                    onClick={() => {
                      this.changeEmail();
                    }}
                  />
                </span>
              </ListItem>
              <ListItem justify="between">
                <span>
                  <h4>
                    <b>
                      Bio{this.state.editBio === false ? (
                        <p>{`${this.state.bio}`}</p>
                      ) : (
                        <Form>
                          <TextInput
                            onDOMChange={e => {
                              this.setState({ bio: e.target.value });
                            }}
                            onKeyPress={this.handleKeyPress}
                          />
                        </Form>
                      )}
                    </b>
                  </h4>
                </span>
                <span className="secondary">
                  <Button
                    icon={<EditIcon />}
                    label="Edit Bio"
                    onClick={() => {
                      this.changeBio();
                    }}
                  />
                </span>
              </ListItem>
            </List>
          </div>
        </Box>
      </Split>
    );
  }
}

export default Profile;
