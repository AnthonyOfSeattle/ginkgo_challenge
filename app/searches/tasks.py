from celery import shared_task
from searches.models import Search, Result
from django.utils import timezone

# Imports for early testing
import random
import time


@shared_task
def search_genomes(pk, sequence):
    """Search genomes for sequence and associate result with primary key"""

    # Update search
    search = Search.objects.get(pk=pk)
    search.status = Search.RUNNING
    search.save()

    # Simulated search process
    try:
        # Simulate error
        if random.randrange(1, 100) <= 10:
            raise ValueError
        
        # Simulate long search
        time.sleep(random.randrange(1, 30))
        search.status = Search.COMPLETE

    except:
        search.status = Search.ERROR

    # Create and save result if successful
    if search.status == Search.COMPLETE:
        result = Result(search=search,
                        genome='GENOME',
                        protein='PROTEIN',
                        start=0,
                        end=0)
        result.save()

    # Update search
    search.finished = timezone.now()
    search.save()

