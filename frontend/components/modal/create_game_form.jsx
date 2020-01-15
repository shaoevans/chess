import { connect } from "react-redux";
import React from "react";

class CreateGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchType: "classical"

        }
    }

    render() {
        return (
            <form>
                <select>
                    <option value="books">Books</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="php">PHP</option>
                    <option value="js">JavaScript</option>
                </select>
                <input type="range" className="slider"/>
            </form>
        )
    }
}

export default CreateGameForm;

// const mapStateToProps = ({

// })

// const mapDispatchToProps = ({

// })
// export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm)