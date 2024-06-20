import Ab from './Ab';


export const metadata = {
    title: `About Us | ToonJoy | Know More`,
    description: ` Toon Joy aims to bring smiles to millions by offering a curated collection of the funniest comedy videos on the internet. Our mission is to spread happiness, one video at a time. We believe in the power of laughter to uplift spirits and connect people across the globe. Through our carefully selected content, we strive to create a platform that celebrates humor in all its forms, from timeless classics to cutting-edge viral sensations.. `
}

const About = () => {
    return (
        <>
            {/*  */}
            <meta name="format-detection" content="telephone=no"></meta>
            <meta name="msapplication-tap-highlight" content="no" ></meta>
            <meta name="apple-mobile-web-app-capable" content="yes" ></meta>
            <meta name="apple-mobile-web-app-title" content="Toon Joy" ></meta>
            <meta name="apple-mobile-web-app-status-bar-style" content="black" ></meta>
            <link rel="apple-touch-icon" href="https://toonjoy.org/favicon.ico"></link>
            <link rel="shortcut icon" href="https://toonjoy.org/favicon.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"></link>
            <link rel="shortcut icon" href="https://toonjoy.org/favicon1.ico" type="image/x-icon" media="(prefers-color-scheme: light)"></link>
            <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
          <Ab/>
        </>
    );
};

export default About;
