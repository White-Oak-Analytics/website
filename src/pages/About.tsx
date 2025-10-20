import StockModel from '../components/StockModel'

export default function About() {
    return (
        <>
            <StockModel />
            <div
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    zIndex: 2,
                }}
            >
                <h1>About White Oak Analytics</h1>
                <p>Use your mouse or trackpad to pan and zoom around the model.</p>
            </div>
        </>
    )
}
