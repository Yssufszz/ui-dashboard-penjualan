document.addEventListener('DOMContentLoaded', function() {
    // Advanced Sales Chart Configuration
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [
            {
                label: 'Penjualan Bulanan',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgb(59, 130, 246)', // Tailwind blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointBackgroundColor: 'rgb(96, 165, 250)', // Tailwind blue-400
                pointBorderColor: 'rgba(96, 165, 250, 0.6)',
                pointHoverBackgroundColor: 'rgb(147, 197, 253)', // Tailwind blue-300
                pointHoverRadius: 8,
            },
            {
                label: 'Proyeksi Penjualan',
                data: [50, 70, 85, 90, 65, 75],
                borderColor: 'rgb(124, 58, 237)', // Tailwind purple-600
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderDash: [5, 5],
                tension: 0.4,
                fill: false,
            }
        ]
    };

    const salesChart = new Chart(ctx, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false,
            },
            plugins: {
                datalabels: {
                    display: false,
                },
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            family: 'Inter',
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 1,
                    titleColor: 'white',
                    bodyColor: 'rgba(229, 231, 235, 0.8)',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 114, 128, 0.2)', // Tailwind gray-500
                        borderColor: 'rgba(107, 114, 128, 0.1)',
                    },
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: 'white',
                    }
                }
            }
        }
    });

    // Interactive Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Stat Card Animations
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 30px rgba(59, 130, 246, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Real-time Data Simulation
    function simulateRealTimeUpdate() {
        // Simulating slight variations in sales data
        const newData = salesData.datasets[0].data.map(value => 
            value + (Math.random() * 10 - 5)
        );
        
        salesChart.data.datasets[0].data = newData;
        salesChart.update();

        // Update some stat cards
        const statValues = document.querySelectorAll('.stat-card p:nth-child(2)');
        statValues.forEach((el, index) => {
            const currentValue = parseFloat(el.textContent.replace('Rp ', '').replace('.', ''));
            const newValue = currentValue + (Math.random() * 1000000 - 500000);
            el.textContent = `Rp ${newValue.toLocaleString()}`;
        });
    }

    // Update every 5 seconds
    setInterval(simulateRealTimeUpdate, 5000);

    // Floating Action Button Interaction
    const fabButton = document.querySelector('.fixed button');
    fabButton.addEventListener('click', () => {
        // Example: Show modal or trigger action
        alert('Tambah Transaksi Baru');
    });
});

// Dark Mode Toggle (Future Enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Additional theme switching logic can be added here
}