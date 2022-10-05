# Changelog

### v1.0.8

05.10.2022.

**Changed**

- Removed outdated dev dependencies and switched to a simpler build process.
- Prepared source files to add type definitions.

---

### v1.0.7

28.09.2020.

**Fixed**

- Moved event bindings to `componentDidMount` to fix `Can't call setState on a component that is not yet mounted` error. It might help with [Plx issue #60](https://github.com/Stanko/react-plx/issues/60) as well.

---

### v1.0.6

07.01.2019.

**Fixed**

- Fixed [the bug](https://github.com/Stanko/react-window-decorators/pull/3) with breakpoint data not being broadcasted properly.

---

### v1.0.5

17.12.2018.

**Fixed**

- Fixed [the bug](https://github.com/Stanko/react-window-decorators/pull/2) introduced in 1.0.4 that broke SSR.

---

### v1.0.4

14.12.2018.

**Changed**

- Changed how custom event is dispatched.

---

### v1.0.3

13.12.2018.

**Changed**

- Updated `window-scroll-manager` dependency.

---

### v1.0.2

30.07.2018.

**Changed**

- Added `scrollPosition` as an `scrollPositionY` alias for backwards compatibility

---

### v1.0.1

12.07.2018.

**Updated**

- Updated `window-scroll-manager` version

---

### v1.0.0

15.06.2018.

**Changed**

- Renamed `scrollPosition` prop to `scrollPositionY`

**Added**

- Enabled horizontal scroll tracking and added `scrollPositionX` prop
- This changelog

---

For changes prior version 1.0.0 please check the [commit list](https://github.com/Stanko/react-window-decorators/commits/dev).
