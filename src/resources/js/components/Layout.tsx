import HeaderBar from "@/components/header/HeaderBar";
import Footer from "@/components/footer/Footer";
import Container from "@mui/material/Container";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* <HeaderBar></HeaderBar> */}
      <main>
        <Container maxWidth="xl" sx={{mt: "20px", minHeight: "70vh"}}>
          {children}
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}