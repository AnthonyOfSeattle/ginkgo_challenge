from django.db import models


class Search(models.Model):
    """Model to store information about submitted searches"""

    # User input
    sequence = models.CharField(max_length=200)

    # Job runtime metadata
    SUBMITTED = 'S'
    RUNNING = 'R'
    COMPLETE = 'C'
    ERROR = 'E'
    STATUS_CHOICES = [
        (SUBMITTED, 'Submitted'),
        (RUNNING, 'Running'),
        (COMPLETE, 'Complete'),
        (ERROR, 'Error')
    ]
    status = models.CharField('job status',
                              max_length=1,
                              choices=STATUS_CHOICES,
                              default=SUBMITTED)
    started = models.DateTimeField('time search was submitted',
                                   auto_now_add=True)
    finished = models.DateTimeField('time search was finished',
                                    null=True)

    def __str__(self):
        final_seq = self.sequence
        if len(final_seq) > 10:
            final_seq = final_seq[1:10] + '...'

        return 'Id: {}, Sequence: {}, Status: {}, Started: {}'.format(
                  self.id, final_seq, self.status, self.started
               )

    def get_runtime(self):
        """Return runtime if complete, else none"""
        if self.status == self.COMPLETE:
            return self.finished - self.started


class Result(models.Model):
    """Model to store search results"""

    search = models.ForeignKey(Search,
                               related_name='results',
                               on_delete=models.CASCADE)
    genome = models.CharField(max_length=9)
    protein = models.CharField(max_length=15)
    start = models.IntegerField(default=-1)
    end = models.IntegerField(default=-1)

    def __str__(self):
        return 'Search id: {}, Genome: {}, Protein: {}, Range: {}-{}'.format(
                  self.search.pk, self.genome, self.protein,
                  self.start, self.end
               )
