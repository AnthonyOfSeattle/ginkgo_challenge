#!/usr/bin/env python
"""Seqsleuth's command line utility to build genome data stor."""
import os
import sys
from genomes.records import GenomeBank


GENOME_LIST = os.environ.get('GENOME_LIST', '').split()
GenomeBank().initialize_bank(GENOME_LIST)
