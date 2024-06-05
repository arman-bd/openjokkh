# OpenJokkh
**Secure. Simple. Open Source.**

OpenJokkh is an open-source solution for blocking bots and ensuring real user interactions on your website. Designed to be easy to integrate and customize, it provides security while maintaining a seamless user experience. Protect your users' data from large corporations, even if it's just a bot.

## Naming History
The name **OpenJokkh** is inspired by **Jokkho** or **Jokkh**, benevolent guardians from Bengali folklore known for protecting hidden treasures. Just as Jokkho guardians safeguard valuable wealth, OpenJokkh aims to protect your website's interactions and data from malicious bots and spam, ensuring privacy and security.

## Disclaimer

**This project is still in progress.** Some features may not be fully implemented or tested. Use at your own risk, and feel free to contribute to its development.

## Features

- **Advanced Verification**: Uses natural mouse movement tracking and dynamic challenge generation to distinguish between humans and bots.
- **Easy Integration**: Simple to add to any website with minimal configuration.
- **Customizable**: Tailor the look and behavior to fit your site's needs.
- **Open Source**: Free to use, modify, and distribute under the MIT license.
- **Data Protection**: Safeguard your users' data from large corporations, ensuring privacy and security.

## Getting Started

### Prerequisites

- **Node.js** (version 20)
- **Docker**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/arman-bd/openjokkh.git
cd openjokkh
```

2. **Build and run with Docker:**
```bash
docker-compose up --build
```

3. **Create an API key using the CLI:**
```bash
docker-compose run create-api-key
```

### Integration

1. **Include the OpenJokkh script in your HTML:**
```html
<script src="/openjokkh.js" data-api-key="YOUR_API_KEY"></script>
```

2. **Add the following HTML where you want the captcha to appear:**
```html
<div id="openjokkh-captcha"></div>
```

### Customization

Modify `public/css/styles.css` and `public/js/captcha.js` to customize the appearance and behavior of the captcha.

### API Endpoints

- **Generate Challenge**: `/api/v1/challenge`
- **Validate Response**: `/api/v1/validate`

## Contributing

We welcome contributions from the community. To contribute, please fork the repository and submit a pull request.

### Development Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Run tests:**
```bash
npm test
```

## License

OpenJokkh is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or support, please open an issue in the GitHub repository.

