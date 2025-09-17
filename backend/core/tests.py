from django.test import TestCase
from django.urls import reverse


class HealthEndpointTests(TestCase):
    def test_health(self):
        url = reverse('health')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'ok')

# Create your tests here.
