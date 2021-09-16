import { StyleSheet } from "react-native";

export const themeColor1 = "navy";
export const themeColor2 = "#ced5e3"

export const globalStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ced5e3",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: themeColor1,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
    fontFamily: "Roboto_700Bold",
  },
  generic: {
    fontSize: 16,
    marginHorizontal: 30,
    color: "#333",
    fontFamily: "Roboto_400Regular_Italic",
  },

  infection: {
    fontSize: 16,
    marginHorizontal: 60,
    fontFamily: "Roboto_400Regular",
  },
  subLabel: {
    fontSize: 16,
    marginHorizontal: 40,
    fontFamily: "Roboto_500Medium",
  },
  miniLabel: {
    fontSize: 16,
    marginVertical: 8,
    lineHeight: 20,
    fontFamily: "Roboto_500Medium",
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 8,
    lineHeight: 20,
    fontFamily: "Roboto_400Regular",
  },
  header: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  input: {
    marginLeft: 10,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: themeColor1,
    borderRadius: 6,
  },
  inputInList: {
    marginLeft: 10,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: themeColor1,
    borderRadius: 6,
    flex: 1,
  },
  fixToSides: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 30,
    alignContent: "flex-start",
  },
  edit: {
    backgroundColor: themeColor2,
    padding: 10,
    height: "60%",
    flexGrow: 0,
  },
  infInput: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  miniButtonContainer: {
    backgroundColor: themeColor2,
    margin: 10,
    borderRadius: 10,
  },
  medHeader: {
    flexDirection: "row",
  },
  error: {
    marginTop: 8,
    marginBottom: 12,
    color: "crimson",
    fontFamily: "Roboto_500Medium",
    textAlign: "center",
  },
  loading: {
    marginTop: 6,
    marginBottom: 12,
    color: themeColor1,
    fontFamily: "Roboto_500Medium",
    textAlign: "center",
  },
  passWrapper: {
    position: "relative",
    display: "flex",
    /* margin-bottom: 14px; */
  },
});