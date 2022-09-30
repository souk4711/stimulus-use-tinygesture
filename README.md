# Stimulus Use TinyGesture

Tracks the user's gesture on an element using the [TinyGesture] library.

## Installation

### Using npm

```sh
npm install stimulus-use-tinygesture @hotwired/stimulus
```

### Using yarn

```sh
yarn add stimulus-use-tinygesture @hotwired/stimulus
```

## Reference

```javascript
useTinyGesture(controller, (options = {}))
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option        | Description                                  | Default value          |
| ------------- | -------------------------------------------- | ---------------------- |
| `element`     | The element used to recognize user's gesture | The controller element |
| `tinygesture` | [Constructor and Options]                    |                        |
| `handlers`    | [Listening to Gesture Events]                |                        |

## Usage

```javascript
import { Controller } from '@hotwired/stimulus'
import { useTinyGesture } from 'stimulus-use-tinygesture'

class TappableController extends Controller {
  connect() {
    useTinyGesture(this, {
      element: this.element,
      tinygesture: {
        // threshold: (type, self) => ...
        // velocityThreshold: 10,
        // disregardVelocityThreshold: (type, self) => ...
        // ...
      },
      handlers: {
        // tap
        // doubletap
        // swipeleft
        // swiperight
        // ...
        tap: [this.handleTapEvent]
      }
    })
  }

  handleTapEvent(event, gesture) {
    console.log(event)
    console.log(gesture)
  }
}
```

[tinygesture]: https://github.com/sciactive/tinygesture
[constructor and options]: https://github.com/sciactive/tinygesture#constructor-and-options
[listening to gesture events]: https://github.com/sciactive/tinygesture#listening-to-gesture-events
