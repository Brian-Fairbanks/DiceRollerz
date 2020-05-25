const reactFormContainer = document.querySelector(".react-form-container");

class ReactFormLabel extends React.Component {
  constructor(props) {
    super(props);
  }

//   render() {
//     return (
//     < label htmlFor={this.props.htmlFor} />{this.props.title}
    
//     )
//   }
}

class ReactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    let newState = {};

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  };

  handleSubmit = (e, message) => {
    e.preventDefault();

    let formData = {
      formSender: this.state.name,
      formEmail: this.state.email,
      formSubject: this.state.subject,
      formMessage: this.state.message
    };

    if (
      formData.formSender.length < 1 ||
      formData.formEmail.length < 1 ||
      formData.formSubject.length < 1 ||
      formData.formMessage.length < 1
    ) {
      return false;
    }

    $.ajax({
      url: "/some/url",
      dataType: "json",
      type: "POST",
      data: formData,
      success: function (data) {
        if (confirm("Thank you for your message. Can I erase the form?")) {
          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: ""
          });
        }
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
        alert("There was some problem with sending your message.");
      }
    });

    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  render() {
    return (
      <form className="react-form" onSubmit={this.handleSubmit}>
        <h1>Say Hi!</h1>

        <fieldset className="form-group">
          <ReactFormLabel htmlFor="formName" title="Full Name:" />

          <input
            id="formName"
            className="form-input"
            name="name"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
        </fieldset>

        <fieldset className="form-group">
          <ReactFormLabel htmlFor="formEmail" title="Email:" />

          <input
            id="formEmail"
            className="form-input"
            name="email"
            type="email"
            required
            onChange={this.handleChange}
            value={this.state.email}
          />
        </fieldset>

        <fieldset className="form-group">
          <ReactFormLabel htmlFor="formSubject" title="Subject:" />

          <input
            id="formSubject"
            className="form-input"
            name="subject"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.subject}
          />
        </fieldset>

        <fieldset className="form-group">
          <ReactFormLabel htmlFor="formMessage" title="Message:" />

          <textarea
            id="formMessage"
            className="form-textarea"
            name="message"
            required
            onChange={this.handleChange}
          ></textarea>
        </fieldset>

        <div className="form-group">
          <input
            id="formButton"
            className="btn"
            type="submit"
            placeholder="Send message"
          />
        </div>
      </form>
    );
  }
}

const { Component } = React;
const { render } = ReactDOM;

const App = (props) => {
  console.clear();
  return (
    <div className="view">
      {props.children}
    </div>
  )
}

const Auth = (props) => {
  return (
    <Card>
      <h2 className="header secondary">{ props.title }</h2>
      <Input name="Email" inputRef="user email" />
      <Input name="Password" inputRef="user password" />
    </Card>
  )
}

const Card = (props) => {
  return (
    <div className="card">
      { props.children }
    </div>
  )
}

const Input = (props) => {
  let formattedName = props.name;
  let inputRef = props.inputRef
  .toLowerCase()
  .split(" ")
  .join("_");
  
  return (
    <div className="custom-input input">      
      <input type="text" id={inputRef} />
      <label htmlFor={inputRef}>{formattedName}</label>
    </div>
  )
}


render(
  <App>
    <Auth title="Login" />
  </App>,
  document.getElementById("root")
)

ReactDOM.render(<ReactForm />, reactFormContainer);
